import TaskTable from "@/components/taskTable";

export default async function Todo() {
  return (
    <>
      <div className="pt-10">
        <form action="/auth/logout" method="post">
          <button
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            ログアウト
          </button>
        </form>
      </div>
      <div className="flex-1 w-full flex flex-col gap-20 items-center pt-24">
        <TaskTable></TaskTable>
      </div>
    </>
  );
}
