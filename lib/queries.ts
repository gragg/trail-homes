export const allTrailhomeSlugsQuery = `*[_type == "handpick" && defined(slug.current)]{
  "slug": slug.current
}`


