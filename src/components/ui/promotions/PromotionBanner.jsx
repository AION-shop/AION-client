import React from 'react'
import Container from '../../shared/Container'

const PromotionBanner = ({ img }) => {
  return (
    <Container>
      <div className="my-5 overflow-hidden rounded-2xl">
        <img
          src={  "https://avatars.mds.yandex.net/i?id=fdaa91cdd327cf9c34ae9dab67e5a751b7839537-4908634-images-thumbs&n=13"}
          alt="Banner 3"
          className="w-[100%] h-[300px] rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
        />
      </div>
    </Container>
  )
}

export default PromotionBanner
