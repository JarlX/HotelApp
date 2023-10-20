using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HotelApp.DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class m4_add_staffimage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StaffImage",
                table: "Staffs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StaffImage",
                table: "Staffs");
        }
    }
}
