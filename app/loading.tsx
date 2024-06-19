
import SkeletonLoader from '@/components/SkeletonLoader'
import React from 'react'

const Loading = ({ height }: { height?: string }) => {
  return (
    <div className={`flex flex-1 justify-center h-screens items-center ${height ? height : 'h-[100px]'}`}>
      <SkeletonLoader>
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-gray-200 border-2 h-8 w-8"></div>
      </SkeletonLoader>
    </div>
  )
}

export default Loading
