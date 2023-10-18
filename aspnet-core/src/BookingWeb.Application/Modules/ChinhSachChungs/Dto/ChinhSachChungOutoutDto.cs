using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingWeb.Modules.ChinhSachChungs.Dto
{
    public class ChinhSachChungOutputDto
    {
        public int Id { get; set; }

        public string KiemTraThongTin { get; set; }

        public string BuaSang { get; set; }

        public string NhanPhong { get; set; }

        public string TraPhong { get; set; }

        public string ChinhSachVePhong { get; set; }

        public string ChinhSachTreEm { get; set; }

        public string ChinhSachVeGiuongPhu { get; set; }

        public string ChinhSachVeThuCung { get; set; }

        public string PhuongThucThanhToan { get; set; }

        public int? DonViKinhDoanhId { get; set; }

    }
}
