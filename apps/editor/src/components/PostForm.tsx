import { Box } from "@gaaamii/ui/Box";
import { Center } from "@gaaamii/ui/Center";
import { Stack } from "@gaaamii/ui/Stack";
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
    <Center maxWidth="4xl">
      <Box
        as="form"
        id={formId}
        onSubmit={onSubmit}
        padding="6"
        borderWidth="1"
        radius="3xl"
        className="mt-12 max-w-[840px] border-[rgba(17,24,39,0.08)] bg-white/85"
      >
        <Stack space="5">
          <Field label="タイトル" htmlFor="title">
            <input
              id="title"
              value={title}
              onChange={(event) => {
                onTitleChange(event.target.value);
              }}
              className={inputClassName}
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
              className={textareaClassName}
            />
            <PostImageUpload
              onInsertMarkdown={(markdown) => {
                onBodyChange(`${body}${markdown}`);
              }}
            />
          </Field>
        </Stack>
      </Box>
    </Center>
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
  <Stack
    as="label"
    htmlFor={htmlFor}
    className="gap-2.5 font-semibold text-gray-700"
  >
    <span>{label}</span>
    {children}
  </Stack>
);

const inputClassName =
  "w-full rounded-[14px] border border-[rgba(17,24,39,0.14)] bg-white px-[14px] py-3";

const textareaClassName = `${inputClassName} resize-y leading-[1.8]`;
