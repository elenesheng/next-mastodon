import { actionTypesEnum } from "@/lib/data/core/entities/Actions";
import { ActionProps } from "./action-props";
import ActionWrapper from "./action-wrapper";

interface LikeActionProps extends ActionProps {
  count: number;
}

export default function Like({
  objectId,
  count,
  fillColor,
  alreadyActed,
  iconClasses,
}: LikeActionProps) {
  return (
    <ActionWrapper
      objectId={objectId}
      alreadyActed={alreadyActed}
      fillColor={fillColor}
      actionType={actionTypesEnum.REACT}
    >
      <svg
        className={iconClasses}
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
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      <span className="ml-1 text-black">{count}</span>
    </ActionWrapper>
  );
}
