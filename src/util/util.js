export const removeParentRouteFromUrl = (url) => {
    return url.replace('https://partnerswayfaircom.csnzoo.com', '')
}

export const menuItems = [
    'settings',
    'userManagement',
    'myTeam',
    'lang',
    'logout'
]

// Ideally translations can be kept in seperate json for each language and should be provided to the translator library if using

const getTranslations = () => {
    return {
        settings: 'Account Settings',
        userManagement: 'User Management',
        myTeam: 'My Team',
        engUk: 'English(UK)',
        german: 'Deutsch',
        logout: 'Logout'
    }
}

const fetchNavBar = () => {
    return fetch('https://run.mocky.io/v3/b49604f2-3705-4e14-992f-1378fb4b598f?mocky-delay=1000ms').then(res =>
    res.json()
  )
}
export const langOptions = [{
    key: 'en-gb',
    value: 'engUk'
}, {
    key: 'de',
    value: 'german'
}]

const Util = {
    getTranslations,
    fetchNavBar
}

export default Util;