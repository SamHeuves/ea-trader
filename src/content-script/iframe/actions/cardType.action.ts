export default function cardType(cardType: string) {
  const card = {
    imageSrc: '',
    qualityDropdown: -1,
    rarityDropdown: -1,
  }

  switch (cardType) {
    // Gold rare
    case 'card-24-small-gold':
      card.imageSrc = 'fc24-gold-2.png'
      card.qualityDropdown = 3
      card.rarityDropdown = 2
      break

    // Gold common
    case 'card-24-small-gold-nr':
      card.imageSrc = 'fc24-gold-1.png'
      card.qualityDropdown = 3
      card.rarityDropdown = 1
      break

    // Gold IF
    case 'card-24-small-goldif':
      card.imageSrc = 'gold-if.png'
      card.qualityDropdown = 3
      card.rarityDropdown = 11
      break

    // Silver rare
    case 'card-24-small-silver':
      card.imageSrc = 'fc24-silver-2.png'
      card.qualityDropdown = 2
      card.rarityDropdown = 2
      break

    // Silver common
    case 'card-24-small-silver-nr':
      card.imageSrc = 'fc24-silver-1.png'
      card.qualityDropdown = 2
      card.rarityDropdown = 1
      break

    // Silver IF
    case 'card-24-small-silverif':
      card.imageSrc = 'silver-if.png'
      card.qualityDropdown = 2
      card.rarityDropdown = 11
      break

    // Bronze rare
    case 'card-24-small-bronze':
      card.imageSrc = 'fc24-bronze-2.png'
      card.qualityDropdown = 1
      card.rarityDropdown = 2
      break

    // Bronze common
    case 'card-24-small-bronze-nr':
      card.imageSrc = 'fc24-bronze-1.png'
      card.qualityDropdown = 1
      card.rarityDropdown = 1
      break

    // Bronze IF
    case 'card-24-small-bronzeif':
      card.imageSrc = 'bronze-if.png'
      card.qualityDropdown = 1
      card.rarityDropdown = 11
      break

    // RTTKO Champions League
    case 'card-24-small-50':
      card.imageSrc = '50.png'
      card.qualityDropdown = 4
      card.rarityDropdown = 10
      break

    // RTTKO Champions League (F)
    case 'card-24-small-31':
      card.imageSrc = '31.png'
      card.qualityDropdown = 4
      break

    // RTTKO Conference League
    case 'card-24-small-105':
      card.imageSrc = '105.png'
      card.qualityDropdown = 4
      card.rarityDropdown = 13
      break

    // RTTKO Europe League
    case 'card-24-small-46':
      card.imageSrc = '46.png'
      card.qualityDropdown = 4
      card.rarityDropdown = 17
      break

    // Icon
    case 'card-24-small-icon':
      card.imageSrc = 'icon.png'
      card.qualityDropdown = 4
      card.rarityDropdown = 7
      break

    // Hero base
    case 'card-24-small-futhero':
      card.imageSrc = 'hero.png'
      card.qualityDropdown = 4
      card.rarityDropdown = 18
      break

    // Hero advanced
    case 'card-24-small-171':
      card.imageSrc = '171.png'
      card.qualityDropdown = 4
      card.rarityDropdown = 16
      break

    // Nike mad
    case 'card-24-small-182':
      card.imageSrc = '182.png'
      card.qualityDropdown = 4
      card.rarityDropdown = 9
      break
  }

  return card
}
