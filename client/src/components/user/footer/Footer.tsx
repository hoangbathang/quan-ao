import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">

            <div className="container p-4">

                <div className="row">

                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase text-success">ESHOP - WEBSITE MUA SẮM THỜI TRANG HÀNG HIỆU TRỰC TUYẾN VIỆT NAM</h5>

                        <p className='text-info'>
                            Mang lại cho khách hàng những trải nghiệm mua sắm thời trang hàng hiệu trực tuyến thú vị từ các thương hiệu thời trang quốc tế và trong nước, cam kết chất lượng phục vụ hàng đầu cùng với những bộ sưu tập quần áo nam nữ khổng lồ từ trang phục, phụ kiện cho phụ nữ với những xu hướng thời trang mới nhất. Bạn có thể tìm thấy những
                            bộ trang phục mình muốn từ những bộ đồ ở nhà thật thoải mái hay tự tin trong những bộ trang phục công sở phù hợp. Những trải nghiệm mới chỉ có ở trang mua sắm hàng hiệu trực tuyến ESHOP.
                        </p>
                    </div>

                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase text-success" >MUA SẮM Ở ESHOP - PHÙ HỢP VỚI TÚI TIỀN TỪ DOANH NHÂN, NHÂN VIÊN VĂN PHÒNG ĐẾN CÁC BẠN TRẺ</h5>

                        <p className='text-info'>
                        ESHOP luôn cập nhật những xu hướng thời trang phong cách nhất đều có ở ESHOP.
                        </p>
                    </div>

                </div>

            </div>



            <div className="text-center p-3" style={
                {
                    backgroundColor: 'brown',
                }
            }>
                © DEV: Bá Thắng
                
            </div>

        </footer>
    )
}

export default Footer
