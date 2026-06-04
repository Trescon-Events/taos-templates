export default function Logo({ width = 220 }: { width?: number }) {
  const height = Math.round(width * (219.99 / 363.64));
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/wcxs-logo.svg"
      alt="World CX Summit & Awards"
      width={width}
      height={height}
      style={{ display: "block", width, height: "auto" }}
    />
  );
}
