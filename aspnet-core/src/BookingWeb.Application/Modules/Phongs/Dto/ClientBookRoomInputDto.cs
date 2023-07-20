﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingWeb.Modules.Phongs.Dto
{
    public class ClientBookRoomInputDto
    {
        public int phongId { get; set; }

        public int loaiPhongId { get; set; }

        public int DatHo { get; set; }

        public string CCCD { get; set; }

        public string HoTen { get; set; }

        public long SDT { get; set; }

        public string Email { get; set; }

        public string YeuCauDacBiet { get; set; }

        public double TongTien { get; set; }
    }
}