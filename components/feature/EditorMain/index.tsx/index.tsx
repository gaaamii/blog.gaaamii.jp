import { Center } from "../../../ui/Center";

const EditorMain = ({ children }: { children: React.ReactNode }) => (
  <Center as="main" maxWidth="prose">
    {children}
  </Center>
);

export default EditorMain;
