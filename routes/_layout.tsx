import { PageProps } from "$fresh/server.ts";
import { Header_top } from "../components/headers/Header_top.tsx";
import { Toolbar } from "../components/headers/Toolbar.tsx";

export default function Layout(props: PageProps) {
  if (props.url.pathname === "/login") {
    return <props.Component />;
  } else {
    return (
      <>
        <Header_top state={props.state}></Header_top>
        <Toolbar _state={props.state}></Toolbar>
        <props.Component></props.Component>
      </>
    );
  }
}
