import Editor from "@monaco-editor/react";
import { useState } from "react";
import Select from "../../../components/Select/Select";
import classes from "./CodeEditorHome.module.scss";
import Button from "../../../components/Button/Button";
import NetworkApi from "../../../api/ NetworkApi";
import { CODING_LANGUAGES } from "./CodeExicutionAPI.constant";

const CodeEditorHome = () => {
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState({
    id: 63,
    name: "JavaScript (Node.js 12.14.0)",
    label: "javascript",
  });
  const [code, setCode] = useState("");
  const [isCompileLoading, setIsCompileLoading] = useState(false);
  const [codeOutput, setCodeOutput] = useState(null);

  const handleThemeChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(JSON.parse(selectedTheme)?.name);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(JSON.parse(selectedLanguage));
  };
  const handleEditorChange = (e) => {
    setCode(e);
  };
  const handleCompile = async () => {
    setIsCompileLoading(true);
    const formData = {
      language_id: language.id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: "",
    };
    const url = process.env.REACT_APP_RAPID_API_URL;
    const headers = {
      "content-type": "application/json",
      "Content-Type": "application/json",
      "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    };
    const params = {
      base64_encoded: "true",
      fields: "*",
    };
    const res = (await NetworkApi.post(url, formData, headers, params)) as {
      token: string;
    };
    const getSubmissionUrl = url + `/${res.token}`;
    const res2 = (await NetworkApi.get(
      getSubmissionUrl,
      headers,
      params
    )) as any;

    if (res2.status?.id > 4 && res2.status?.description) {
      setCodeOutput(res2.status?.description);
    } else {
      setCodeOutput(atob(res2.stdout));
    }
  };
  return (
    <div className={classes["code-editor-wrapper"]}>
      <div className="flex flex-wrap justify-between items-center">
        <h1 className="text-app-pink main-header">Code Editor</h1>
        <div className="flex flex-wrap">
          <Select
            className="mb-4"
            label="Theme"
            name="theme"
            onChange={handleThemeChange}
            optionLabel="name"
            optionValue="id"
            isHideSelectOptionFallback={true}
            options={[
              { id: 1, name: "vs-dark" },
              { id: 2, name: "light" },
            ]}
          />
          <Select
            className="mb-4"
            label="Language"
            name="language"
            onChange={handleLanguageChange}
            optionLabel="name"
            optionValue="id"
            isHideSelectOptionFallback={true}
            options={CODING_LANGUAGES}
          />
          <div className="self-end mb-4 ml-2">
            <Button onClick={handleCompile} className="btn-primary">
              Compile & Run
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start">
        <Editor
          height="70vh"
          theme={theme}
          language={language.label}
          defaultLanguage={language.label}
          defaultValue="// Happy Coding..."
          onChange={handleEditorChange}
        />
        <div className="flex flex-shrink-0 w-[30%] flex-col">
          <h1 className="font-bold text-xl bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 mb-2">
            Output
          </h1>
          <div className="w-full h-56 bg-[#2c2c32] rounded-md text-white font-normal text-sm overflow-y-auto">
            <pre className="p-2">{codeOutput}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditorHome;
