import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  // dateString이 유효한지 확인
  if (!dateString) {
    // 유효하지 않다면, 대체 컨텐츠 또는 null 반환
    return <p>Date not available</p>
  }

  // 유효한 경우, 날짜 처리
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
