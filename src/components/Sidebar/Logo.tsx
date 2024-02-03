export function Logo() {
  return (
    <strong className="mx-1 flex items-center gap-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
      <img
        style={{ borderRadius: 50 }}
        width={38}
        height={38}
        src="https://media.licdn.com/dms/image/C560BAQF7RGUDJfRzCw/company-logo_200_200/0/1648757861308/texo_it_logo?e=1715212800&v=beta&t=occsoZywxShzxSvH0K2ZbYOICjF5jqvcU5_EebGJJ6w"
        alt="logo"
      />
      <span>Texo it - Rafael</span>
    </strong>
  )
}
