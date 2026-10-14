type ReservedRouteProps = {
  name: string;
};

export function ReservedRoute({ name }: ReservedRouteProps) {
  return (
    <main className="page-shell reserved-route">
      <p className="type-meta">Personal Brand / Foundation</p>
      <h1 className="type-heading-m">{name} is reserved for a future build phase.</h1>
      <a href="/system">View the internal system reference</a>
    </main>
  );
}
