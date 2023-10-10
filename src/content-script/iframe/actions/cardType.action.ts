export default function cardType(cardType: string) {
  console.log(cardType)

  let imageSrc = ''

  switch (cardType) {
    // Gold rare
    case 'card-24-small-gold':
      imageSrc = 'fc24-gold-2.png'
      break

    // Gold common
    case 'card-24-small-gold-nr':
      imageSrc = 'fc24-gold-1.png'
      break

    // Gold IF
    case 'card-24-small-goldif':
      imageSrc = 'gold-if.png'
      break

    // Silver rare
    case 'card-24-small-silver':
      imageSrc = 'fc24-silver-2.png'
      break

    // Silver common
    case 'card-24-small-silver-nr':
      imageSrc = 'fc24-silver-1.png'
      break

    // Silver IF
    case 'card-24-small-silverif':
      imageSrc = 'silver-if.png'
      break

    // Bronze rare
    case 'card-24-small-bronze':
      imageSrc = 'fc24-bronze-2.png'
      break

    // Bronze common
    case 'card-24-small-bronze-nr':
      imageSrc = 'fc24-silver-1.png'
      break

    // Bronze IF
    case 'card-24-small-bronzeif':
      imageSrc = 'bronze-if.png'
      break

    // RTTKO Champions League
    case 'card-24-small-50':
      imageSrc = '50.png'
      break

    // RTTKO Champions League (F)
    case 'card-24-small-31':
      imageSrc = '31.png'
      break

    // RTTKO Conference League
    case 'card-24-small-105':
      imageSrc = '105.png'
      break

    // RTTKO Europe League
    case 'card-24-small-46':
      imageSrc = '46.png'
      break

    // Icon
    case 'card-24-small-icon':
      imageSrc = 'icon.png'
      break

    // Hero base
    case 'card-24-small-futhero':
      imageSrc = 'hero.png'
      break

    // Hero advanced
    case 'card-24-small-171':
      imageSrc = '171.png'
      break

    // Nike mad
    case 'card-24-small-182':
      imageSrc = '182.png'
      break
  }

  return imageSrc
}
