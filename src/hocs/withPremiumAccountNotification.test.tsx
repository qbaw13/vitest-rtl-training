import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import withPremiumAccountNotification from "./withPremiumAccountNotification";
import { selectActiveUserId } from "../store/selectors/select-active-user-id";
import upgradeAccount from "../api/rest/upgrade-account";

vi.mock("../store/selectors/select-active-user-id");
vi.mock("../api/rest/upgrade-account");

const selectActiveUserIdMock = vi.mocked(selectActiveUserId);
const upgradeAccountMock = vi.mocked(upgradeAccount);

interface StubComponentProps {
  id: number;
}

const StubComponent = ({ id }: StubComponentProps) => <div>COMPONENT {id}</div>;

const DEFAULT_ID = 1;
const DEFAULT_PROPS = {
  id: DEFAULT_ID,
};

interface CreateSutProps {
  props?: StubComponentProps;
}

function createSut({ props = DEFAULT_PROPS }: CreateSutProps = {}) {
  const EnhancedComponent = withPremiumAccountNotification(StubComponent);
  return {
    user: userEvent.setup(),
    ...render(<EnhancedComponent {...props} />),
  };
}

async function waitForRender() {
  await screen.findByText(/COMPONENT/);
}

describe("premium account notification", () => {
  it("should render notification when user has not premium account", async () => {
    // given
    selectActiveUserIdMock.mockReturnValue(1);

    // when
    createSut();
    await waitForRender();

    // then
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("should call upgrade account ", async () => {
    // given
    selectActiveUserIdMock.mockReturnValue(1);
    const { user } = createSut();
    await waitForRender();

    // when
    await user.click(screen.getByRole("button", { name: "Upgrade" }));

    expect(upgradeAccountMock).toHaveBeenCalled();
  });

  it("should NOT render notification when user has premium account", async () => {
    // given
    selectActiveUserIdMock.mockReturnValue(2);

    // when
    createSut();
    await waitForRender();

    // then
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should close dialog on cancel click", async () => {
    // given
    selectActiveUserIdMock.mockReturnValue(1);
    const { user } = createSut();
    await waitForRender();

    // when
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));

    // then
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
