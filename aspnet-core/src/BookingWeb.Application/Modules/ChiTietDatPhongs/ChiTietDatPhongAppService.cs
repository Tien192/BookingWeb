using Abp.Domain.Repositories;
using BookingWeb.DbEntities;
using BookingWeb.Modules.ChiTietDatPhongs.Dto;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingWeb.Modules.ChiTietDatPhongs
{
    public class ChiTietDatPhongAppService : BookingWebAppServiceBase
    {
        private readonly IRepository<ChiTietDatPhong> _chiTietDatPhong;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public ChiTietDatPhongAppService(IRepository<ChiTietDatPhong> chiTietDatPhong, IHttpContextAccessor httpContextAccessor)
        {
            _chiTietDatPhong = chiTietDatPhong;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<ChiTietDatPhongDto>> GetAllList()
        {
            try
            {
                var lstChiTiet = await _chiTietDatPhong.GetAllListAsync();
                var dtoList = lstChiTiet.Select(e => new ChiTietDatPhongDto
                {
                    Id = e.Id,
                    PhongId = e.PhongId,
                    PhieuDatPhongId = e.PhieuDatPhongId,
                    TrangThaiPhongId = e.TrangThaiPhongId,
                    CheckIn = e.CheckIn,
                    CheckOut = e.CheckOut,
                    SLNguoiLon = e.SLNguoiLon,
                    SLTreEm = e.SLTreEm,
                    SLPhong = e.SLPhong,
                    TienPhongQuaHan = e.TienPhongQuaHan,
                    NgayHuy = e.NgayHuy,
                    ChiPhiHuyPhong = e.ChiPhiHuyPhong,
                    TongTien = e.TongTien

                }).ToList();
                return dtoList;
            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"error : {ex.Message}");
                return null;
            }
        }

    }
}
