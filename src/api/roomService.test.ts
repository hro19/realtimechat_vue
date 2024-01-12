// roomService.test.js

import { describe, it, expect,vi } from "vitest";
import { getAllRooms, createChatRoom } from "./roomService";
import axiosCommon from "../api/axiosCommon";

describe("getAllRooms", () => {
  it("should return rooms array", async () => {
    const mockRooms = [{ id: 1 }, { id: 2 }];
    vi.spyOn(axiosCommon, "get").mockResolvedValue({ data: mockRooms });

    const rooms = await getAllRooms();
    expect(rooms).toEqual(mockRooms);
  });
});

describe("createChatRoom", () => {
  it("should create and return a room", async () => {
    const newRoom = { id: 1, name: "room1" };
    vi.spyOn(axiosCommon, "post").mockResolvedValue({ data: newRoom });

    const room = await createChatRoom("room1");
    expect(room).toEqual(newRoom);
  });
});
