import { ExternalLink } from 'lucide-react'

type OptionalLinkProps = {
  name: string
  url: null | string | undefined
}

export const OptionalLink: React.FC<OptionalLinkProps> = ({ name, url }) => {
  return url ? <LinkWithIcon name={name} url={url} /> : <>{name}</>
}

type LinkWithIconProps = {
  name: string
  url: string
}

export const LinkWithIcon: React.FC<LinkWithIconProps> = ({ name, url }) => {
  return (
    <a className={'flex'} href={url} target="_blank">
      {name}
      <ExternalLink className={'pl-0.5'} size={16} />
    </a>
  )
}
