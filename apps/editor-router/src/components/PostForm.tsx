import { PostImageUpload } from "./PostImageUpload";

type Props = {
  formId: string;
  title: string;
  body: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
  onTitleChange: (value: string) => void;
  onBodyChange: (value: string) => void;
};

export const PostForm = ({
  formId,
  title,
  body,
  onSubmit,
  onTitleChange,
  onBodyChange,
}: Props) => {
  return (
    <form
      id={formId}
      onSubmit={onSubmit}
      style={{
        maxWidth: "840px",
        margin: "0 auto",
        display: "grid",
        gap: "20px",
        marginTop: "48px",
        padding: "24px 32px",
        border: "1px solid rgba(17, 24, 39, 0.08)",
        borderRadius: "20px",
        backgroundColor: "rgba(255, 255, 255, 0.86)",
      }}
    >
      <Field label="タイトル" htmlFor="title">
        <input
          id="title"
          value={title}
          onChange={(event) => {
            onTitleChange(event.target.value);
          }}
          style={textInputStyle}
        />
      </Field>

      <Field label="本文" htmlFor="body">
        <textarea
          id="body"
          rows={18}
          value={body}
          onChange={(event) => {
            onBodyChange(event.target.value);
          }}
          style={textareaStyle}
        />
        <PostImageUpload
          onInsertMarkdown={(markdown) => {
            onBodyChange(`${body}${markdown}`);
          }}
        />
      </Field>
    </form>
  );
};

const Field = ({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) => (
  <label
    htmlFor={htmlFor}
    style={{
      display: "grid",
      gap: "10px",
      fontWeight: 600,
      color: "#374151",
    }}
  >
    <span>{label}</span>
    {children}
  </label>
);

const textInputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "14px",
  border: "1px solid rgba(17, 24, 39, 0.14)",
  backgroundColor: "#ffffff",
};

const textareaStyle = {
  ...textInputStyle,
  resize: "vertical" as const,
  lineHeight: 1.8,
};
