'use client'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface opt {
  id: string
  label: string
  link: string
}

interface CommentaryDropdownProps {
  options: opt[]
  buttonClass: string
  dropdownContainerClass: string
  dropDownItemClass: string
  selectedOption: string
  handleOptionClick: (option: opt) => void;
  allowLink?: boolean;
}

const CommentaryDropdown: React.FC<CommentaryDropdownProps> = ({
  options,
  buttonClass,
  dropdownContainerClass,
  dropDownItemClass,
  selectedOption,
  handleOptionClick,
  allowLink
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const handleMouseDown = (event: MouseEvent) => {
    if (!(event.target as Element).closest('.issearching')) {
      setTimeout(() => {
        setIsOpen(false)
      }, 200)
    }
  }
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleMouseDown)
    } else {
      document.removeEventListener('mousedown', handleMouseDown)
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isOpen])

  let defaultOption: 'commentary' | 'bible' | 'tough-topics';

  if (pathname.includes('commentary')) {
    defaultOption = 'commentary'

  } else if (pathname.includes('bible')) {
    defaultOption = 'bible'
  } else if (pathname.includes('tough-topics')) {
    defaultOption = 'tough-topics'
  }

  const [timelineDropDown, setTimelineDropDown] = useState(false)

  const selected = options.find(o => o.id === selectedOption) || options.find(o => o.id === defaultOption);

  return (
    <div className="relative inline-block text-left mb-0 min-[948px]:mb-0">
      <div className="flex flex-row justify-between">
        <button
          aria-label="Show timeline details"
          type="button"
          className={`inline-flex issearching font-lexend justify-between w-56 border shadow-sm p-2 pl-3 pr-3 bg-white text-[15px] focus:outline-none ${buttonClass}`}
          onClick={() => {
            setIsOpen(!isOpen)
            if (!isOpen && timelineDropDown) {
              setTimelineDropDown(false)
            }
          }}
        >
          {selected?.label || selectedOption}

          {isOpen ? (
            <ChevronUpIcon className="w-5 pl-2 mt-1" />
          ) : (
            <ChevronDownIcon className="w-5 pl-2 mt-1" />
          )}
        </button>
      </div>
      {isOpen && (
        <div
          className={`commentaryoption origin-top-right absolute z-50 sm:right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ${dropdownContainerClass}`}
        >
          <div className="py-1 max-h-80 overflow-y-auto" role="none">
            {options.map((option) => (
              <Link
                key={option.label}
                href={`../${option.link}`}
                className={`block px-4 py-2 ml-1 mr-1 font-lexend  text-[15px] text-gray-700 hover:bg-[#10101014] dark:hover:bg-thebiblesayswhite-8 dark:hover:text-gray-300 ${dropDownItemClass}`}
                role="menuitem"
                onClick={(e) => {
                  if (!allowLink) {
                    e.preventDefault();
                    handleOptionClick(option);
                  }
                }}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentaryDropdown
