import DashBoardIcon from 'data-base64:~/assets/iwwa_dashboard.svg'
import ClockIcon from 'data-base64:~/assets/clarity_clock-line.svg'
import PassWordIcon from 'data-base64:~/assets/mdi_password-outline.svg'
export interface MenuItems {
    title: string
    icon: string
    link: string
   
  }

export const menuItems: MenuItems[] = [
    {
        title: "Dashboard",
        link: "/options.html",
        icon: DashBoardIcon

    },
    {
        title: "Block Settings",
        link: "/tabs/blocksettings.html",
        icon: ClockIcon

    },
    {
        title: "Pin Protection",
        link: "/pin-protection",
        icon: PassWordIcon

    },
    {
        title: "Additional Settings",
        link: "/additional-settings",
        icon: PassWordIcon

    },
]