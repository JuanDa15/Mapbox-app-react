export async function getLocation(): Promise<[number, number]> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      coords
        ? resolve([coords.longitude, coords.latitude])
        : reject('Error getting coords')
    }, (error) => {
      console.log(error)
      reject('Error getting coords')
    })
  })
}