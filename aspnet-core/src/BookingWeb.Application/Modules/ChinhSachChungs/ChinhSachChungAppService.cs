using Abp.Domain.Repositories;
using BookingWeb.DbEntities;
using BookingWeb.Modules.ChinhSachChungs.Dto;
using BookingWeb.Modules.DichVuTienIchs.Dto;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingWeb.Modules.ChinhSachChungs
{
    public class ChinhSachChungAppService : BookingWebAppServiceBase
    {
        private readonly IRepository<ChinhSachChung> _chinhSachChung;

        private readonly IRepository<DonViKinhDoanh> _donViKinhDoanh;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public ChinhSachChungAppService(IRepository<ChinhSachChung> chinhSachChung,
            IRepository<DonViKinhDoanh> donViKinhDoanh,
            IHttpContextAccessor httpContextAccessor)
        {
            _chinhSachChung = chinhSachChung;
            _donViKinhDoanh = donViKinhDoanh;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ChinhSachChungOutputDto> GetPolicyByDVKDId(int dvkdId)
        {
            try
            {
                var policy = await _chinhSachChung.FirstOrDefaultAsync(p => p.DonViKinhDoanhId == dvkdId);
                var dto = new ChinhSachChungOutputDto
                {
                    Id=policy.Id,
                    KiemTraThongTin = policy.KiemTraThongTin,
                    BuaSang = policy.BuaSang,
                    NhanPhong = policy.NhanPhong,
                    TraPhong = policy?.TraPhong,
                    ChinhSachVePhong = policy?.ChinhSachVePhong,
                    ChinhSachTreEm = policy?.ChinhSachTreEm,
                    ChinhSachVeGiuongPhu = policy?.ChinhSachVeGiuongPhu,
                    ChinhSachVeThuCung = policy?.ChinhSachVeThuCung,
                    PhuongThucThanhToan = policy?.PhuongThucThanhToan,
                    DonViKinhDoanhId = dvkdId
                };
                return dto;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<ChinhSachChungOutputDto>> GetAllListChinhSach()
        {
            try
            {
                var lstCs = await _chinhSachChung.GetAllListAsync();

                var dto = lstCs.Select(e => new ChinhSachChungOutputDto
                {
                    Id = e.Id,
                    KiemTraThongTin = e.KiemTraThongTin,
                    BuaSang = e.BuaSang,
                    NhanPhong = e.NhanPhong,
                    TraPhong = e.TraPhong,
                    ChinhSachVePhong = e.ChinhSachVePhong,
                    ChinhSachTreEm = e.ChinhSachTreEm,
                    ChinhSachVeGiuongPhu = e.ChinhSachVeGiuongPhu,
                    ChinhSachVeThuCung = e.ChinhSachVeThuCung,
                    PhuongThucThanhToan = e.PhuongThucThanhToan,
                    DonViKinhDoanhId = e.DonViKinhDoanhId

                } ).ToList();

                return dto;
            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"error : {ex.Message}");
                return null;
            }
        }


        public async Task<bool> AddNewCsc(ChinhSachChungInputDto input)
        {
            try
            {
                var check = await _donViKinhDoanh.FirstOrDefaultAsync(p => p.Id == input.DonViKinhDoanhId);

                if (check != null)
                {
                    var csc = new ChinhSachChung
                    {
                        KiemTraThongTin = input.KiemTraThongTin,
                        BuaSang = input.BuaSang,
                        NhanPhong = input.NhanPhong,
                        TraPhong =input.TraPhong,
                        ChinhSachVePhong = input.ChinhSachVePhong,
                        ChinhSachTreEm = input.ChinhSachTreEm,
                        ChinhSachVeGiuongPhu = input.ChinhSachVeGiuongPhu,
                        ChinhSachVeThuCung = input.ChinhSachVeThuCung,
                        PhuongThucThanhToan = input.PhuongThucThanhToan,
                        DonViKinhDoanhId = input.DonViKinhDoanhId

                    };

                    await _chinhSachChung.InsertAsync(csc);
                    return true;
                }
                else
                {
                    await _httpContextAccessor.HttpContext.Response.WriteAsync($"khong tim thay don vi kinh doanh voi id = {input.DonViKinhDoanhId}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"error : {ex.Message}");
                return false;
            }
        }


        public async Task<bool> UpdateCsc(ChinhSachChungOutputDto input)
        {
            try
            {
                var check = await _chinhSachChung.FirstOrDefaultAsync(p => p.Id == input.Id);

                if (check != null)
                {
                    check.BuaSang = input.BuaSang;
                    check.KiemTraThongTin = input.KiemTraThongTin;
                    check.NhanPhong = input.NhanPhong;
                    check.TraPhong = input.TraPhong;
                    check.ChinhSachVePhong = input.ChinhSachVePhong;
                    check.ChinhSachTreEm = input.ChinhSachTreEm;
                    check.ChinhSachVeGiuongPhu = input.ChinhSachVeGiuongPhu;
                    check.ChinhSachVeThuCung = input.ChinhSachVeThuCung;
                    check.PhuongThucThanhToan = input.PhuongThucThanhToan;
                    check.DonViKinhDoanhId = input.DonViKinhDoanhId;

                    await _chinhSachChung.UpdateAsync(check);
                    return true;
                }
                else
                {
                    await _httpContextAccessor.HttpContext.Response.WriteAsync($"khong tim thay chinh sach chung voi id = {input.Id} cua don vi kinh doang {input.DonViKinhDoanhId}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"error : {ex.Message}");
                return false;
            }
        }


        public async Task<bool> DeleteCsc(int id)
        {
            try
            {
                var checkCsc = await _chinhSachChung.FirstOrDefaultAsync(p => p.Id == id);
                if (checkCsc != null)
                {
                    await _chinhSachChung.DeleteAsync(checkCsc);
                    await _httpContextAccessor.HttpContext.Response.WriteAsync($"da xoa dich vu {checkCsc}");
                    return true;

                }
                else
                {
                    await _httpContextAccessor.HttpContext.Response.WriteAsync($"khong tim thay dvu voi id = {id}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"error : {ex.Message}");
                return false;
            }
        }

    }
}
