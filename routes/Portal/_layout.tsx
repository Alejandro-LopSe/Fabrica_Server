import { PageProps } from "$fresh/server.ts";
import { Header_top } from "../../components/headers/Header_top.tsx";

export default function Layout(props: PageProps) {
  return (
    <>
      <Header_top state={props.state}></Header_top>
      <props.Component></props.Component>
    </>
  );
}
