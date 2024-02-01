export default function Loading() {
  return (
    <svg
      id="loadingIndicator"
      className="ml-3 h-5 w-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 4v1.5m0 13v1.5m4-10.5l-1.5 1.5m-7.5 7.5l-1.5 1.5m10.5-7.5l-1.5 1.5"
      ></path>
    </svg>
  )
}
