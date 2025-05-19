import { ExternalLink } from 'lucide-react'

type OptionalLinkProps = {
  name: string
  url: string | undefined | null
}

export const OptionalLink: React.FC<OptionalLinkProps> = ({ name, url }) => {
  return url ? <LinkWithIcon url={url} name={name} /> : <>{name}</>
}

type LinkWithIconProps = {
  name: string
  url: string
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = ({ name, url }) => {
  return (
    <a href={url} className={'flex'} target="_blank">
      {name}
      <ExternalLink className={'pl-0.5'} size={16} />
    </a>
  )
}
