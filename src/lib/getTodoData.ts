export default function getTodoData() {
    return JSON.parse(localStorage.getItem("todo") || "[]");
}
