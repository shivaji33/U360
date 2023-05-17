import { RouteObject } from "react-router-dom";
import CodeEditorHome from "../../modules/code-editor/CodeEditorHome/CodeEditorHome";


export const expensesRoutes: RouteObject[] = [
    {
      path: "/",
      element: <CodeEditorHome />,
      index: true
    },
]
