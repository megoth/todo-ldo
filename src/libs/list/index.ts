import {ListShape} from "@/ldo/todo.typings";

export function getListUrl(list: ListShape): string {
    return `/list/${encodeURIComponent(list["@id"]!)}`;
}