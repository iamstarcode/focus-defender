import DeleteIcon from "data-base64:~/assets/delete.svg"
import React, { useEffect, useState } from "react"
import toast, { toastConfig } from "react-simple-toasts"

import { Storage } from "@plasmohq/storage"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "~/components/ui/dialog"
import { Button } from "~components/ui/button"
import { Input } from "~components/ui/input"

import "react-simple-toasts/dist/theme/success.css" // choose your theme
import "react-simple-toasts/dist/theme/failure.css"

const storage = new Storage()

export default function AddWebsite() {
  const [blockedWebsites, setBlockedWebsites] = useState(null)
  const [website, setWebsite] = useState<string>("")

  useEffect(() => {
    // fetch blocked websites from the local storage
    storage.get("blockedWebsites").then(
      (websites) => setBlockedWebsites(websites || []),
      // if there are no websites, set an empty array
      // this usually gets triggered if the method fails or returns an error
      () => setBlockedWebsites([])
    )
  }, [])

  const handleChange = (event) => {
    // handles input change
    setWebsite(event.target.value)
  }

  function isValidURL(input) {
    var res = input.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  };

  const handleClick = async () => {
if(isValidURL(website) === true) {
    setBlockedWebsites([website, ...blockedWebsites])
    await storage.set("blockedWebsites", [website, ...blockedWebsites])
    toast("Website Added!", { position: "top-right", theme: "success" })
    setWebsite("")
} else {
    toast("Enter a valid URL!", { position: "top-right", theme: "failure" })
    setWebsite("")
}
    
  }
  const handleDelete = async (website: string) => {
    setBlockedWebsites(
      blockedWebsites.filter((websiteFromStorage: string) => websiteFromStorage !== website)
    )

    // remove from local storage
    storage.set(
      "blockedWebsites",
      blockedWebsites.filter((websiteFromStorage: string) => websiteFromStorage !== website)
    )
    toast("Website Removed!", { position: "top-right", theme: "success" })
  }
  const handleCancel = () => {
    setWebsite("")
  }
  return (
    <div className="mt-10 ">
      <h3 className="text-xl font-bold my-5">Blocked Websites</h3>
      <div className="flex w-full justify-between">
        <div className="border-2 border-primary w-[50%] p-6 rounded-md">
          {blockedWebsites?.length !== 0 ? (
            blockedWebsites?.map((website) => (
              <div
                key={website}
                className="flex justify-between items-center bg-[#b6bedf] px-5 rounded-xl mb-2">
                <p className="text-[#6d6c6c]">{website}</p>
                <Button
                  aria-label="Remove Website"
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(website)}>
                  <img src={DeleteIcon} alt="Delete_icon" className="w-6 h-6" />
                </Button>
              </div>
            ))
          ) : (
            <p className="mx-auto w-fit my-8">No blocked websites yet!</p>
          )}
        </div>
        <Dialog>
          <DialogTrigger>
            <Button variant="menu" className="py-6 px-8 ">
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M31.6668 21.6634H21.6668V31.6634H18.3335V21.6634H8.3335V18.3301H18.3335V8.33008H21.6668V18.3301H31.6668V21.6634Z"
                  fill="currentColor"
                />
              </svg>
              Add Website
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Website</DialogTitle>
            </DialogHeader>
            <Input
              type="type"
              id="addWebsite"
              value={website}
              onChange={handleChange}
              placeholder="add website name (ex.youtube.com)"
              className="my-[60px] "
            />
            <DialogFooter>
            <DialogClose >
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="mr-3 border-2 border-primary">
                  Cancel
                </Button>
                <Button onClick={handleClick}>Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
