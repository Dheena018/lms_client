export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2>Instructor Layout (optional header/sidebar)</h2>
      <main>{children}</main>
    </div>
  );
}
