﻿using Abp.Domain.Repositories;
using BookingWeb.DbEntities;
using BookingWeb.Modules.DiaDiems.Dto;
using BookingWeb.Modules.Phongs.Dto;
using BookingWeb.Modules.SearchingFilter.Dto;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookingWeb.Modules.Phongs
{
    public class PhongAppService : BookingWebAppServiceBase
    {
        private readonly IRepository<Phong> _phong;
        private readonly IRepository<HinhThucPhong> _hinhThuc;
        private readonly IRepository<HinhAnh> _hinhAnh;
        private readonly IRepository<DiaDiem> _diaDiem;
        private readonly IRepository<LoaiPhong> _loaiPhong;
        private readonly IRepository<DichVuTienIch> _dichvu;
        private readonly IRepository<NhanXetDanhGia> _nhanXet;
        private readonly IRepository<ChiTietDatPhong>  _chiTietDatPhong;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public PhongAppService(IRepository<Phong> phong, IRepository<HinhThucPhong> hinhThuc,
            IRepository<HinhAnh> hinhAnh, IRepository<DiaDiem> diaDiem,
            IRepository<LoaiPhong> loaiPhong, IRepository<DichVuTienIch> dichvu,
            IRepository<NhanXetDanhGia> nhanXet, IRepository<ChiTietDatPhong> chiTietDatPhong
            , IHttpContextAccessor httpContextAccessor)
        {
            _phong = phong;
            _hinhThuc = hinhThuc;
            _hinhAnh = hinhAnh;
            _diaDiem = diaDiem;
            _loaiPhong = loaiPhong;
            _dichvu = dichvu;
            _nhanXet = nhanXet;
            _chiTietDatPhong = chiTietDatPhong;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<List<GetPhongByLocationDto>> GetRoomsByDiaDiemId(int id)
        {
            try
            {
                var lstP = await _phong.GetAllListAsync();
                var phongs = lstP.Where(p => p.DiaDiemId == id).ToList() ;

                if (phongs == null || !phongs.Any())
                {
                    await _httpContextAccessor.HttpContext.Response.WriteAsync($"Không tìm thấy phòng thuộc địa điểm có id = {id}");
                    return null;
                }
                else
                {
                    var hinhAnh = await _hinhAnh.GetAllListAsync();
                    var dichVu = await _dichvu.GetAllListAsync();

                    var dtoList = new List<GetPhongByLocationDto>();

                    foreach (var i in phongs)
                    {
                        var diaDiem = await _diaDiem.FirstOrDefaultAsync(p => p.Id == id);
                        var loaiPhong = await _loaiPhong.FirstOrDefaultAsync(p => p.Id == i.LoaiPhongId);
                        var hinhThucPhong = await _hinhThuc.FirstOrDefaultAsync(p => p.Id == i.HinhThucPhongId);

                        var dtoP = new GetPhongByLocationDto
                        {
                            Id = i.Id,
                            TenDonVi = hinhThucPhong.TenDonVi,
                            TenFileAnhDaiDien = i.TenFileAnhDaiDien,
                            DiaChiChiTiet = hinhThucPhong.DiaChiChiTiet,
                            Mota = i.Mota,
                            TrangThaiPhong = i.TrangThaiPhong,
                            DanhGiaSaoTb = i.DanhGiaSaoTb,
                            DiemDanhGiaTB = i.DiemDanhGiaTB,
                            DiaDiem = diaDiem.TenDiaDiem,
                            LoaiPhong = loaiPhong.TenLoaiPhong,
                            HinhThucPhong = hinhThucPhong.TenHinhThuc,
                            GiaPhongTheoDem = loaiPhong.GiaPhongTheoDem,
                            HinhAnh = hinhAnh.Where(p => p.PhongId == i.Id).Select(p => p.TenFileAnh).ToList(),
                            DichVu = dichVu.Where(p => p.LoaiPhongId == i.LoaiPhongId).Select(p => p.TenDichVu).ToList(),
                            MienPhiHuyPhong = i.MienPhiHuyPhong,
                            ChinhSachVePhong = hinhThucPhong.ChinhSachVePhong,
                            ChinhSachVeTreEm = hinhThucPhong.ChinhSachVeTreEm,
                            ChinhSachVeThuCung = hinhThucPhong.ChinhSachVeThuCung
                        };

                        dtoList.Add(dtoP);
                    }
                    return dtoList;
                }
            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"Error: {ex.Message}");
                return null;
            }
        }




        public async Task<List<PhongOutputDto>> GetAllRoom()
        {
            try
            {
                var lstP = await _phong.GetAllListAsync();
                var lstHt = await _hinhThuc.GetAllListAsync();
                var lstDd = await _diaDiem.GetAllListAsync();
                var lstLp = await _loaiPhong.GetAllListAsync();
                var lstDv = await _dichvu.GetAllListAsync();
                var lstA = await _hinhAnh.GetAllListAsync();

                var dtoLst = lstP.Select(entity => new PhongOutputDto
                {
                    Id = entity.Id,
                    HinhThucPhong = lstHt.Where(p => p.Id == entity.HinhThucPhongId)
                                            .Select(p => p.TenHinhThuc).ToList(),

                    DiaDiem = lstDd.Where(p => p.Id == entity.DiaDiemId)
                                    .Select(p => p.TenDiaDiem).ToList(),

                    LoaiPhong = lstLp.Where(p => p.Id == entity.LoaiPhongId)
                                    .Select(p => p.TenLoaiPhong).ToList(),

                    Mota = entity.Mota,
                    TrangThaiPhong = entity.TrangThaiPhong,
                    TenFileAnhDaiDien = entity.TenFileAnhDaiDien,
                    ChinhSach = lstHt.Where(b => b.Id == entity.HinhThucPhongId)
                                    .Select(b => $"{b.ChinhSachVePhong}, {b.ChinhSachVeTreEm}, {b.ChinhSachVeThuCung}")
                                    .ToList(),
                    DichVuTienIch = lstDv.Where(p => p.LoaiPhongId == entity.LoaiPhongId)
                                    .Select(p => p.TenDichVu).ToList(),
                    Anh = lstA.Where(p => p.PhongId == entity.Id).Select(p => p.TenFileAnh).ToList()

                }).ToList();

                return dtoLst;

            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"error : {ex.Message}");
                return null;
            }
        }


        public async Task<bool> AddNewRoom(PhongDto input)
        {
            try
            {
                var lp = new Phong
                {
                    Mota = input.Mota,
                    TrangThaiPhong = input.TrangThaiPhong,
                    TenFileAnhDaiDien = input.TenFileAnhDaiDien,
                    DiaDiemId = input.DiaDiemId,
                    LoaiPhongId = input.LoaiPhongId,
                    HinhThucPhongId = input.HinhThucPhongId,
                    DiemDanhGiaTB = 0,
                    DanhGiaSaoTb = 0,
                    MienPhiHuyPhong = 0
                    
                };
                await _phong.InsertAsync(lp);
                return true;
            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"error : {ex.Message}");
                return false;
            }

        }


        public async Task<bool> UpdateRoom(PhongInputDto input)
        {
            try
            {
                var checkP = await _phong.FirstOrDefaultAsync(p => p.Id == input.Id);

                if (checkP != null)
                {
                    if (input.Mota != null)
                    {
                        checkP.Mota = input.Mota;
                    }

                    if (input.TrangThaiPhong.ToString() != null)
                    {
                        checkP.TrangThaiPhong = input.TrangThaiPhong;
                    }

                    if (input.TenFileAnhDaiDien != null)
                    {
                        checkP.TenFileAnhDaiDien = input.TenFileAnhDaiDien;
                    }

                    if (input.DiaDiemId != null)
                    {
                        checkP.DiaDiemId = input.DiaDiemId;
                    }

                    if (input.LoaiPhongId != null)
                    {
                        checkP.LoaiPhongId = input.LoaiPhongId;
                    }

                    if (input.HinhThucPhongId != null)
                    {
                        checkP.HinhThucPhongId = input.HinhThucPhongId;
                    }

                    await _phong.UpdateAsync(checkP);
                    return true;
                }
                else
                {
                    await _httpContextAccessor.HttpContext.Response.WriteAsync($"khong ton tai loai phong voi id = {input.Id}");
                    return false;
                }
            }
            catch (Exception ex)
            {
                await _httpContextAccessor.HttpContext.Response.WriteAsync($"error : {ex.Message}");
                return false;
            }
        }



        public async Task<bool> DeleteRoom(int id)
        {
            try
            {
                var checkP = await _phong.FirstOrDefaultAsync(p=>p.Id == id);

                if (checkP != null)
                {
                    var hinhAnh = await _hinhAnh.GetAllListAsync();
                    var checkHa = hinhAnh.Where(p => p.PhongId == checkP.Id).ToList();
                    if (checkHa.Count() != 0)
                    {
                        foreach (var i in checkHa)
                        {
                            await _hinhAnh.DeleteAsync(i);
                            await _httpContextAccessor.HttpContext.Response.WriteAsync($"da xoa hinh anh {i}");
                        }
                    }

                    var chiTietDatPhong = await _chiTietDatPhong.GetAllListAsync();
                    var checkCtdp = chiTietDatPhong.Where(p=>p.PhongId == checkP.Id).ToList();
                    if(checkCtdp.Count() != 0)
                    {
                        var nhanXet = await _nhanXet.GetAllListAsync();
                        foreach (var i in checkCtdp)
                        {
                            var checkNx = nhanXet.Where(p=>p.ChiTietDatPhongId == i.Id).ToList();
                            if (!checkNx.Any())
                            {
                                foreach(var j in checkNx)
                                {
                                    await _nhanXet.DeleteAsync(j);
                                    await _httpContextAccessor.HttpContext.Response.WriteAsync($"da xoa nhan xet {j}");

                                }
                            }
                            await _chiTietDatPhong.DeleteAsync(i);
                            await _httpContextAccessor.HttpContext.Response.WriteAsync($"da xoa chi tiet dat phong {i}");
                        }
                    }

                    await _phong.DeleteAsync(checkP);
                    return true;
                }
                else
                {
                    await _httpContextAccessor.HttpContext.Response.WriteAsync($"khong ton tai phong voi id = {id}");
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
