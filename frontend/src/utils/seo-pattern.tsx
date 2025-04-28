import { Helmet } from "react-helmet";
import { config } from "./constants";

interface SEOProps {
  title?: string;
  description?: string;
  path: string;
}

function SEO({
  title = "Knowleadger - Acesse e salve conteúdos difíceis de encontrar!",
  description = "Chega de esquecer informações o que você vai precisar consultar no futuro. Registre e acesse tudo isso em um só local.",
  path,
}: SEOProps) {
  // URL canônica completa
  const url = `${config.baseUrl}${path}`;

  return (
    <Helmet>
      {/* Título da Página */}
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Meta Tags para SEO */}
      <meta name="robots" content="index, follow" />
      <meta
        name="keywords"
        content="estudo, react, node, postgree, reactQuery, axios, http, patterns, test, jest"
      />
      <meta name="author" content="Knowleadger" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph (para redes sociais) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* URL da imagem estática para o Open Graph */}
      {/* Open Graph Image: 1200x630 px */}
      <meta property="og:image" content="/seo/og-image.jpg" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* URL da imagem estática para o Twitter */}
      {/* Twitter Card Image: 1200x630 px */}
      <meta name="twitter:image" content="/seo/og-image.jpg" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Favicon */}
      <link rel="icon" href="/seo/favicon.ico" />
      <link rel="apple-touch-icon" href="/seo/webclip.jpg" />
      <link rel="manifest" href="/seo/manifest.json" />

      {/* Web Clip (ícone para iOS) */}
      {/* Webclip Icon: 180x180 px */}
      <link rel="apple-touch-icon" href="/seo/webclip.jpg" />

      {/* Imagens para dispositivos de alta densidade de pixels (como retina display) */}
      {/* Favicon 32x32 px */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32" // Tamanho recomendado: 32x32 pixels
        href="/seo/favicon-32x32.jpg"
      />
      {/* Favicon 16x16 px */}
      <link
        rel="icon"
        type="image/png"
        sizes="16x16" // Tamanho recomendado: 16x16 pixels
        href="/seo/favicon-16x16.jpg"
      />
    </Helmet>
  );
}

export default SEO;
