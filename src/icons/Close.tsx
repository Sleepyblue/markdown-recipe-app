const Close = ({ size, iconClass }: { size: number; iconClass: string }) => {
  return (
    <div className={iconClass}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path
            d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z"
            opacity=".5"
          />
          <path strokeLinecap="round" d="m14.5 9.5l-5 5m0-5l5 5" />
        </g>
      </svg>
    </div>
  );
};

export default Close;
