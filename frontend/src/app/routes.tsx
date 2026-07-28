import { createBrowserRouter } from "react-router";
import Root from "./Root";
import { HomePage } from "../pages/home/HomePage";
import { CatalogPage } from "../pages/catalog/CatalogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "catalog", Component: CatalogPage },
      { path: "catalog/:category", Component: CatalogPage },
      { path: "catalog/:category/:page", Component: CatalogPage },
      { path: "catalog/:category/:page/:productSlug", Component: CatalogPage },
    ],
  },
]);
