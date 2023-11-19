interface LikeActionProps {
  count: number;
}

export default function Share({ count }: LikeActionProps) {
  return (
    <>
      <div className="flex items-center">
        <svg
          className=" h-6 w-6 text-black"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m17 2 4 4-4 4" />
          <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
          <path d="m7 22-4-4 4-4" />
          <path d="M21 13v1a4 4 0 0 1-4 4H3" />
        </svg>
        <span className="ml-1 text-black">{count}</span>
      </div>
    </>
  );
}
