import { daysOfTheWeek, times } from 'constants/daysOfTheWeek'
import React, { useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog'
import { Button } from '~components/ui/button'
import { Input } from '~components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~components/ui/select'

export default function Schedule() {
  const [scheduleName, setScheduleName] = useState<string>('')
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [isCheckAll, setIsCheckAll] = useState(false)
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

  const handleChange = event => {
    // handles input change
    setScheduleName(event.target.value)
  }
  const handleOnChange = event => {
    const isChecked = event.target.checked
    const value = event.target.value
    if (isChecked) {
      setSelectedDays([...selectedDays, value])
    } else {
      let index = selectedDays.indexOf(event.target.value)
      selectedDays.splice(index, 1)
      setSelectedDays([...selectedDays])
    }
  }

  const handleAllDays = () => {
    setIsCheckAll(!isCheckAll)
    setSelectedDays(daysOfTheWeek.map(day => day.day))
    if (isCheckAll) {
      setSelectedDays([])
    }
  }

  const handleStartTime = (value) => {
 setStartTime(value)
  }
  const handleEndTime = (value) => {
    setEndTime(value)
  }

  const handleCancel = () => {
    setScheduleName('')
    setSelectedDays([])
    setStartTime('')
    setEndTime('')
  }
  function handleClick(): void {
    alert(`created ${scheduleName} and ${selectedDays}`)
  }
  console.log(selectedDays)
  console.log(startTime)
  console.log(endTime)

  return (
    <div className="mt-10 ">
      <h3 className="text-xl font-bold mt-2">Schedule</h3>
      <div className="flex w-full justify-between">
        <div className="items-center bg-[#b6bedf] px-5 w-[50%] p-2 mt-6 rounded-md">
          <div>
            <p className="text-sm font-bold my-5">Serious Mode</p>
          </div>
        </div>
        <Dialog>
          <DialogTrigger>
            <Button variant="menu" className="py-6 px-8" onClick={handleCancel}>
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M31.6668 21.6634H21.6668V31.6634H18.3335V21.6634H8.3335V18.3301H18.3335V8.33008H21.6668V18.3301H31.6668V21.6634Z"
                  fill="currentColor"
                />
              </svg>
              Schedule
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Schedule</DialogTitle>
            </DialogHeader>
            <Input
              type="type"
              id="scheduleName"
              value={scheduleName}
              onChange={handleChange}
              placeholder="Add Schedule Name"
              className="my-[60px] w-[90%] mx-auto"
            />

            <div className="flex mb-5 my-auto mx-auto">
              {daysOfTheWeek.map((day, index) => (
                <div className="ml-2" key={day.abbr}>
                  <input
                    type="checkbox"
                    onChange={event => handleOnChange(event)}
                    id={day.day}
                    className="peer hidden"
                    value={day.day}
                    checked={selectedDays.includes(day.day)}
                  />
                  <label
                    htmlFor={day.day}
                    className="cursor-pointer rounded-lg border-2 border-primary hover:bg-accent hover:text-accent-foreground py-3 px-4 font-bold text-gray-700 transition-colors duration-200 ease-in-out peer-checked:bg-primary  peer-checked:text-primary-foreground"
                  >
                    {day.abbr}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex items-center ml-10">
              <input
                type="checkbox"
                onChange={() => handleAllDays()}
                id="allDays"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                checked={isCheckAll && selectedDays.length == 7}
              />
              <label
                htmlFor="allDays"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Every Day
              </label>
            </div>
            <div className="w-[70%] flex justify-between mx-auto my-5">
              <div className="flex flex-col">
                <h4 className="font-bold mb-4">Start Time</h4>

                <Select onValueChange={(value) => handleStartTime(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Time…" />
                  </SelectTrigger>
                  <SelectContent className="h-[200px]">
                    <SelectGroup>
                      <SelectLabel className="text-center">
                        Select Time
                      </SelectLabel>

                      {times.map(time => (
                        <SelectItem
                          key={`start-time-${time.hour}`}
                          value={time.hour}
                          
                        >
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <h4 className="font-bold mb-4">End Time</h4>
                <Select onValueChange={(value) => handleEndTime(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Time…" />
                  </SelectTrigger>
                  <SelectContent className="h-[200px]">
                    <SelectGroup>
                      <SelectLabel className="text-center">
                        Select Time
                      </SelectLabel>

                      {times.map(time => (
                        <SelectItem
                          key={`end-time-${time.hour}`}
                          value={time.hour}
                        >
                          {time.time}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="mr-3 border-2 border-primary"
                >
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
