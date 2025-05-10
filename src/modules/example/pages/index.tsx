"use client";

import { Header } from "@acervo/components/header";
import { ExampleComponent } from "@acervo/modules/example/components/example";

const Example = () => {
  return (
    <>
      <Header />
      <main className="pt-24 flex flex-col justify-evenly px-5 md:px-10">
        <ExampleComponent />
      </main>
    </>
  );
};

export default Example;
