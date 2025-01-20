import NewestProducts from "./components/NewestProducts";

export default function Page() {
  return (
    <section className="max-w-7x mx-auto px-4 md:px-8 mb-24">
      <div className="max-w-7xl mx-auto text-2xl sm:text-5xl lg:text-6xl font-semibold text-center">
        <h1>Find the best Tailwinds</h1>
        <h1 className="text-primary">Templates & Icons</h1>
        <p className="lg:text-lg text-muted-foreground mx-auto mt-5 w-[90%] font-normal text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, eius. Unde commodi omnis ea aperiam? Iste facilis nesciunt nostrum incidunt nisi? Excepturi veniam deserunt alias obcaecati ad, optio dolorum necessitatibus.</p>
      </div>
      <NewestProducts/>
    </section>
  );
}
