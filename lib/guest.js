"use client";

import { v4 as uuidv4 } from "uuid";

export function getGuestId() {
  if (typeof window === "undefined") return null;

  let id = localStorage.getItem("guest_id");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("guest_id", id);
  }
  return id;
}
