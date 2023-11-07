import { act, renderHook, waitFor } from "@testing-library/react";
import useUser from "./useUser";

describe("user hook", () => {
  it("should return user", async () => {
    // when
    const { result } = renderHook(() => useUser());

    // then
    await waitFor(() => {
      expect(result.current.user).toMatchObject({
        id: "1",
        name: "NAME_1",
        surname: "SURNAME_1",
        premium: false,
        investmentsCount: 2,
        createdAt: "2010-01-01T23:00:00.000Z",
      });
    });
  });

  it("should fetch random user", async () => {
    // given
    const originalMathRandomFn = Math.random;
    const stubMathRandomFn = () => 0.22;
    Math.random = stubMathRandomFn;
    const { result } = renderHook(() => useUser());

    // when
    act(() => {
      result.current.randomUser();
    });

    // then
    await waitFor(() => {
      expect(result.current.user).toMatchObject({
        id: "22",
        name: "NAME_22",
        surname: "SURNAME_22",
        premium: true,
        investmentsCount: 44,
        createdAt: "2010-01-22T23:00:00.000Z",
      });
    });
    Math.random = originalMathRandomFn;
  });
});
