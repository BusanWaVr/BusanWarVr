

function TestPage() {
    const startChat



  return (
    <div>
        <p>채팅 기능 테스트를 위해 임시로 만든 페이지입니다</p>
        <p>본인이 개설한 tourId를 확인하고 입력해주세요!</p>

        <form onsubmit={startChat}>
            <input type="text"
                value={tourId}
                onChange={handleChangeTourId}
                placeholder="tourId"
            />
            <button type="submit">채팅 시작</button>
        </form>
    </div>
  );
}

export default TestPage;
