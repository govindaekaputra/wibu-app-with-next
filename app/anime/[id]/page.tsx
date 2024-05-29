import AnimeById from "./_components/AnimeById";

export default async function AnimeByIdPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  return <AnimeById id={id} />;
}
