function loadFromStorage() {
  const data = sessionStorage.getItem("myArrayData")
  return JSON.parse(data)
}

function saveToStorage(data) {
  sessionStorage.setItem("myArrayData", JSON.stringify(data))
}

const myArray = loadFromStorage() || []

const list = [
  { id: "5", value: "11" },
  { id: "0", value: "43" },
  { id: "1", value: "99" },
  { id: "2", value: "1" },
  { id: "3", value: "18" },
  { id: "4", value: "73" },
]

const item = { id: "7", value: "69" }

const item2 = { id: "6", value: "100" }

function arrPush(arr, item) {
  if (!item) {
    return
  }

  if (Array.isArray(item)) {
    item.forEach((i) => {
      if (!arr.find((existing) => existing.id === i.id)) {
        arr.push(i)
      }
    })
    return arr
  }

  if (arr.find((item) => item.id === item.id)) {
    return
  }

  arr.push(item)
  return arr
}

function arrSort(arr) {
  arr.sort((a, b) => a.id - b.id)
  return arr
}

function changeValue(arr, selectedId, newValue) {
  const selected = arr.find((i) => i.id === selectedId.toString())

  if (!selected) {
    return
  }
  selected.value = newValue.toString()

  return arr
}

function changeSequence(arr, id, move) {
  const currentIndex = arr.findIndex((i) => i.id === id.toString())
  const nextIndex = currentIndex + 1
  const previousIndex = currentIndex - 1

  if (currentIndex !== -1) {
    switch (move) {
      case "up":
        if (currentIndex > 0) {
          const [item] = arr.splice(currentIndex, 1)
          arr.splice(previousIndex, 0, item)
        }
        break

      case "down":
        if (currentIndex < arr.length - 1) {
          const [item] = arr.splice(currentIndex, 1)
          arr.splice(nextIndex, 0, item)
        }
        break

      default:
    }
  }

  return arr
}

function currentId(arr) {
  arr.forEach((item, index) => {
    item.id = index.toString()
  })

  return arr
}

function result() {
  arrPush(myArray, item)
  arrPush(myArray, item2)
  arrPush(myArray, list)
  changeValue(myArray, 7, 9)

  changeSequence(myArray, 0, "down")
  currentId(myArray)

  // arrSort(myArray)
  saveToStorage(myArray)

  return myArray
}

export { result }
