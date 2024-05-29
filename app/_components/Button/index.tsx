"use client";

type Props = {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export function TextButton(props: Props) {
  const { text, onClick } = props;
  return (
    <button
      className="bg-transparent border-none underline text-white hover:scale-125 hover:text-gray-400"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
