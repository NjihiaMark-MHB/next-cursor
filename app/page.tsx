import Users from "./components/users/users";
export default function Home() {
  return (
    <section className="pt-10">
      <div className="container mx-auto px-2">
        <div className="flex content-center items-center justify-center">
          <div className="w-full lg:w-6/12 px-4">
            <Users />
          </div>
        </div>
      </div>
    </section>
  );
}
