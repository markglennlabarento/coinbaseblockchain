import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: 'walf131s',
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token:
    'skb0aSFXa5kkRt1nbJeEhGwiPL1L1grNypSJv4Inir3rQabBXrmXRt7Hpj65dvcC4ANrFDTrBDqPHHg8nQClO5Umys2tny120kmU1rhey3yeOZhaj9pwKr6U15q0le6pYqukaL5BJnDkvqVC3dK9Zn9zkbeAfXNHLk2FyZYA9BKQJMOSybse', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})
