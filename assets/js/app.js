var setupApp = function () {
  const container = document.querySelector('.Nav')
  const primary = container.querySelector('.NavLinks')
  const primaryItems = container.querySelectorAll('.NavLinks > li:not(.NavMore)')
  container.classList.add('--jsfied')

  // insert "more" button and duplicate the list
  primary.insertAdjacentHTML('beforeend', `
    <li class="NavMore">
      <button class="NavMore-button" type="button" aria-haspopup="true" aria-expanded="false">
        More <i class="NavMore-span fas fa-caret-circle-down"></i>
      </button>
      <ul class="NavSecondary">
        ${primary.innerHTML}
      </ul>
    </li>
  `)
  const secondary = container.querySelector('.NavSecondary')
  const secondaryItems = secondary.querySelectorAll('li')
  const allItems = container.querySelectorAll('li')
  const moreLi = primary.querySelector('.NavMore')
  const moreBtn = moreLi.querySelector('button')
  moreBtn.addEventListener('click', (e) => {
    e.preventDefault()
    container.classList.toggle('Nav--show-secondary')
    moreBtn.setAttribute('aria-expanded', container.classList.contains('Nav--show-secondary'))
  })

  // adapt tabs

  const doAdapt = () => {
    // reveal all items for the calculation
    allItems.forEach((item) => {
      item.classList.remove('Nav--hidden')
    })

    // hide items that won't fit in the Primary
    let stopWidth = moreBtn.offsetWidth
    let hiddenItems = []
    const primaryWidth = primary.offsetWidth
    primaryItems.forEach((item, i) => {
      if (primaryWidth >= stopWidth + item.offsetWidth) {
        stopWidth += item.offsetWidth
      } else {
        item.classList.add('Nav--hidden')
        hiddenItems.push(i)
      }
    })

    // toggle the visibility of More button and items in Secondary
    if (!hiddenItems.length) {
      moreLi.classList.add('Nav--hidden')
      container.classList.remove('Nav--show-secondary')
      moreBtn.setAttribute('aria-expanded', false)
    } else {
      secondaryItems.forEach((item, i) => {
        if (!hiddenItems.includes(i)) {
          item.classList.add('Nav--hidden')
        }
      })
    }
  }

  doAdapt() // adapt immediately on load
  window.addEventListener('resize', doAdapt) // adapt on window resize

  // hide Secondary on the outside click

  document.addEventListener('click', (e) => {
    let el = e.target
    while (el) {
      if (el === secondary || el === moreBtn) {
        return;
      }
      el = el.parentNode
    }
    container.classList.remove('Nav--show-secondary')
    moreBtn.setAttribute('aria-expanded', false)
  })
}


if (
  document.readyState === "complete" ||
  (document.readyState !== "loading" && !document.documentElement.doScroll)
) {
  setupApp();
} else {
  document.addEventListener("DOMContentLoaded", setupApp);
}
